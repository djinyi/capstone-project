class ChecklistsController < ApplicationController

    def index
        checklist = @current_user.checklist
        if checklist.count > 0
            render json: checklist, include: :user, status: :ok
        else
            render json: { error: ["Start your checklist!"]}, status: :unprocessable_entity
        end
    end

    def create
        todo = @current_user.checklist.create(checklist_params)
        if todo.valid?
            render json: todo, status: :created
        else
            render json: { error: "Task can't be blank" }, status: :unprocessable_entity
        end
    end

    def destroy
        checklist = Checklist.find_by(id: params[:id])
        if checklist
            checklist.destroy
            render json: {}, head: :no_content
        else
            not_authorized
        end
    end

    private

    def checklist_params
        params.permit(:to_do)
    end
end
