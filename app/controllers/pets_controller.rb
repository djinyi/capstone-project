class PetsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    wrap_parameters format: []
    skip_before_action :authorize, only: [:show, :destroy]

    def index
        pets = @current_user.pets
        # pets = Pet.all
        render json: pets, include: :user, status: :ok
    end

    def show
        user = User.find(params[:id])
        pets = user.pets
        if pets
            render json: pets, status: :ok
        else
            render_not_found_response
        end
    end

    def create
        pet = @current_user.pets.create(pet_params)
        if pet.valid?
            render json: pet, status: :created
        else
            render json: { error: "Name can't be blank" }, status: :unprocessable_entity
        end
    end

    def update
        pet = find_pet
        if pet
            pet.update!(pet_params)
            render json: pet, status: :ok
        else
            not_authorized
        end
    end

    def destroy
        # pet = find_pet
        pet = Pet.find_by(id: params[:id])
        if pet
            pet.destroy
            render json: {}, head: :no_content
        else
            not_authorized
        end
    end


    private

    def pet_params
        params.permit(:name, :breed, :description, :picture, :medical_needs, :dob, :notes)
    end

    def find_pet
        @current_user.pets.find_by(id: params[:id])
    end

    def render_not_found_response
        render json: {error: "Pet Not Found"}, status: :not_found
    end
    
    def not_authorized
        render json: {errors: "Not authorized."}, status: :unprocessable_entity
    end

    def render_unprocessable_entity_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
