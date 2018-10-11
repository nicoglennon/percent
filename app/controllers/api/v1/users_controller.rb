class Api::V1::UsersController < ApplicationController

  def new
    if logged_in?
      redirect_to '/@' + current_user.username
    else
      @user = User.new
      if params[:email]
        @user.email = params[:email]
        @user.username = params[:email].split(/(?=\@\b)/)[0];
      end
      @user
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(params[:user][:email], params[:user][:password])
      flash[:success] = 'Welcome!'
      redirect_to '/@' + @user.username
    else
      @errors = @user.errors.full_messages
      render 'new'
    end
  end

  def show
    if logged_in? && current_user.username == params[:id]
      @user = User.find_by_username(params[:id])
      render :json => @user, :except => [:email, :crypted_password, :salt, :created_at, :updated_at], :include => { :weeks => { :include => :goals } }
    elsif logged_in? && current_user.username != params[:id]
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
