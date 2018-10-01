class Api::V1::WeeksController < ApplicationController

  def index
    @weeks = Week.all
    render :json => @weeks
  end

  def create
    @week = Week.new(week_params)
    p @week
    if @week.errors
      p @week.errors
    end
    @week.save!
    p @week
    render :json => @week
  end

  private
  def week_params
    params.require(:week).permit(:date, :percentage, :user_id)
  end
end
