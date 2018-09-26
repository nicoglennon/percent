class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all
    render :json => @users
  end

  def show
    @user = User.find_by_username(params[:id])
    render :json => @user, :include => :weeks
  end
end
