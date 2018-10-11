class PagesController < ApplicationController
  def hero
    if logged_in?
      redirect_to '/@' + current_user.username
    end
  end

  def app
    p current_user
    p logged_in?
    p params
    if !logged_in?
      redirect_to login_path
    end
  end
end
