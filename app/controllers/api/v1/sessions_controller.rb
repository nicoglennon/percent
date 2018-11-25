class Api::V1::SessionsController < ApplicationController

  def new
    if logged_in?
      redirect_to '/@' + current_user.username
    end
  end

  def create
    if login(params[:email_or_username].downcase, params[:password])
      flash[:success] = 'Welcome back!'
      redirect_to '/@' + current_user.username
    else
      @error = 'Username/email and/or password is incorrect.'
      render 'new'
    end
  end

  def destroy
    logout
    redirect_to login_path
  end
end
