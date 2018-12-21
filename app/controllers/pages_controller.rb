class PagesController < ApplicationController
  def hero
    if logged_in?
      redirect_to '/@' + current_user.username
    end
  end

  def app
    if !logged_in?
      redirect_to login_path
    end
  end

  def settings
    if !logged_in?
      redirect_to login_path
    end
    @current_user = current_user
    p @current_user
  end
end
