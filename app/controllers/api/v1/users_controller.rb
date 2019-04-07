class Api::V1::UsersController < ApplicationController

  before_action :require_login, only: [ :show, :edit, :update, :destroy ]

  def new
    if logged_in?
      return redirect_to '/@' + current_user.username
    else
      @user = User.new
      if params[:email] && params[:email] != ''
        @user.email = params[:email].downcase
        @user.username = params[:email].downcase.split(/(?=\@\b)/)[0].split('.').join('');
      end
      @user
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user.username, params[:user][:password])
      upsert_contact_in_email_service(@user)
      UserMailer.welcome_email(@user).deliver_now
      @user.boards.create!(title: 'My Board')
      return redirect_to '/@' + @user.username + '/tour'
    else
      @errors = @user.errors.full_messages
      render 'new'
    end
  end

  def edit
    if !logged_in?
      redirect_to login_path
    end
    @user = current_user
    @current_user = current_user
  end

  def update
    @user = current_user
    @user.skip_password = true
    if @user.update_attributes(user_update_params)
      upsert_contact_in_email_service(@user)
      redirect_to '/'
    else
      @current_user = User.find(params['user'][:id])
      @errors = @user.errors.full_messages
      render 'edit'
    end
  end

  def show
    if current_user.username == params[:id]
      @user = User.find_by_username(params[:id])
      render :json => @user,
                        :except => [:email, :crypted_password, :salt, :created_at, :updated_at],
                        :include => [
                          { :weeks => {
                              :include => [
                                :goals => {
                                  :except => [
                                    :created_at,
                                    :updated_at
                                  ]
                                }
                              ]
                            }
                          },
                          { :boards => {
                              :include => [
                                :goals => {
                                  :except => [
                                    :created_at,
                                    :updated_at
                                  ]
                                }
                              ]
                            }
                          }
                        ]

    elsif current_user.username != params[:id]
      redirect_to '/@' + current_user.username
    else
      redirect_to '/'
    end
  end

  def destroy
    @user = current_user
    if @user.destroy!
      UserMailer.goodbye_email(@user).deliver_now
      unsubscribe_contact_in_email_service(@user)
      redirect_to '/'
    else
      @errors = @user.errors.full_messages
      render 'edit'
    end

  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def user_update_params
    params.require(:user).permit(:username, :email)
  end

  def upsert_contact_in_email_service(user)
    ::ContactCreationService.new.upsert(user)
  end

  def unsubscribe_contact_in_email_service(user)
    ::ContactCreationService.new.unsubscribe(user)
  end

end
