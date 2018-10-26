class Api::V1::WeeksController < ApplicationController

  before_action :require_login

  def create
    @week = Week.new(week_params)
    if @week.save
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

  def destroy
    p params
    @week = Week.find(params[:id])
    if @week.destroy!
      render :json => @week
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
