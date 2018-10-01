class Api::V1::WeeksController < ApplicationController

  def create
    @week = Week.new(week_params)
    if @week.save
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
    params.require(:week).permit(:date, :percentage, :user_id)
  end
end
