class Api::V1::WeeksController < ApplicationController

  before_action :require_login

  def create
    @week = Week.new(week_params)
    p 'params arriving to server'
    p week_params
    p @week.goals
    if @week.save
      p 'week saved to server:'
      p @week
      render :json => @week.goals
    else
      @errors = []
      if @week.errors
        if @week.errors.full_messages
          @week.errors.full_messages.each do |error_message|
            @errors << error_message
          end
        end
      end
      render :json => {status: "error", code: 4000, error_messages: @errors}
    end
  end

  private
  def week_params
    params.require(:week).permit(:date, :percentage, :user_id, { :goals_attributes => [ :title, :completed, :goalable_type, :goalable_id ]})
  end
end
