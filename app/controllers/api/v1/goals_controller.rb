class Api::V1::GoalsController < ApplicationController

  before_action :require_login

  def create
    @goal = Goal.new(goal_params)
    p goal_params
    if @goal.save
      render :json => @goal
    else
      @errors = []
      if @goal.errors
        if @goal.errors.full_messages
          @goal.errors.full_messages.each do |error_message|
            @errors << error_message
          end
        end
      end
      render :json => {status: "error", code: 4000, error_messages: @errors}
    end
  end

  def update
    @goal = Goal.find(params[:id])
    if @goal.update!(goal_params)
      render :json => @goal
    else
      @errors = []
      if @goal.errors
        if @goal.errors.full_messages
          @goal.errors.full_messages.each do |error_message|
            @errors << error_message
          end
        end
      end
      render :json => {status: "error", code: 4000, error_messages: @errors}
    end

  end

  def destroy
    p params
    @goal = Goal.find(params[:id])
    if @goal.destroy!
      render :json => @goal
    else
      @errors = []
      if @goal.errors
        if @goal.errors.full_messages
          @goal.errors.full_messages.each do |error_message|
            @errors << error_message
          end
        end
      end
      render :json => {status: "error", code: 4000, error_messages: @errors}
    end
  end

  private
  def goal_params
    params.require(:goal).permit(:title, :goalable_id, :goalable_type)
  end
end
