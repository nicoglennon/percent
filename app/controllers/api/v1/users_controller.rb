class Api::V1::UsersController < ApplicationController

  def show
    @user = User.find_by_username(params[:id])
    render :json => @user, :include => :weeks
  end
end
