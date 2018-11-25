class Api::V1::UsersController < ApplicationController

  before_action :require_login, only: [ :show ]

  def new
    if logged_in?
      return redirect_to '/@' + current_user.username
    else
      @user = User.new
      if params[:email] && params[:email] != ''
        @user.email = params[:email].downcase!
        @user.username = params[:email].downcase.split(/(?=\@\b)/)[0].split('.').join('');
      end
      @user
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user.username, params[:user][:password])
      @user.boards.create!(title: 'My Board')
      return redirect_to '/@' + @user.username + '/welcome'
    else
      @errors = @user.errors.full_messages
      render 'new'
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

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
