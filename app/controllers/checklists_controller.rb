class ChecklistsController < ApplicationController

    def index
        checklist = @current_user.checklist
        render json: checklist, include: :user, status: :ok
    end

    def create
        todo = @current_user.checklist.create!(checklist_params)
        render json: todo, status: :created
    end

    def destroy
        checklist = Checklist.find_by(id: params[:id])
        checklist.destroy
        render json: {}, head: :no_content
    end

    private

    def checklist_params
        params.permit(:to_do)
    end
end
