class Api::V1::BoardsController < ApplicationController

  before_action :require_login

  def create
    @board = Board.new(board_params)
    if @board.save
      render :json => @board
    else
      @errors = []
      if @board.errors
        if @board.errors.full_messages
          @board.errors.full_messages.each do |error_message|
            @errors << error_message
          end
        end
      end
      render :json => {status: "error", code: 4000, error_messages: @errors}
    end
  end

  def update
    @board = Board.find(params[:id])
    if @board.update!(board_params)
      render :json => @board
    else
      @errors = []
      if @board.errors
        if @board.errors.full_messages
          @board.errors.full_messages.each do |error_message|
            @errors << error_message
          end
        end
      end
      render :json => {status: "error", code: 4000, error_messages: @errors}
    end
  end

  private
  def board_params
    params.require(:board).permit(:title, :goals, :user_id, { :goals_attributes => [ :id, :order ]})
  end
end
