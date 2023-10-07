class PetsController < ApplicationController
    wrap_parameters format: []
    skip_before_action :authorize, only: [:show, :destroy]

    def index
        pets = @current_user.pets.all.with_attached_images
        # pets = Pet.all.with_attached_images
        render json: pets, include: :user, status: :ok
    end

    def show
        pet = Pet.find(params[:id])
        if pets
            render json: pet, status: :ok
        else
            render_not_found_response
        end
    end

    def create
        pet = @current_user.pets.create!(pet_params)
        render json: pet, status: :created
    end

    def pictures
        pet = Pet.find_by(id: params[:id])
        images = rails_blob_path(pet.images)
        render json: {pet: pet.name, images: images}
    end

    def attach_picture
        pet = Pet.find_by(id: params[:id])
        pet.images.attach(params[:images])
        render json: pet
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

    def images_params
        params.permit(images:[])
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

end
