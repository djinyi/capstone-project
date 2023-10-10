class ContactsController < ApplicationController
    wrap_parameters format: []

    def index
        contacts = @current_user.contacts.all
        # contacts = Contact.all
        render json: contacts, status: :ok
    end

    def show
        contact = find_contact
        render json: contact, status: :ok
    end

    def create_contact
        pet = Pet.find(params[:pet_id])
        contact = pet.contacts.create!(contact_params)
        render json: contact, status: :created
    end

    # def update
    #     contact = find_contact
    #     Contact.update!(contact_params)
    #     render json: contact, status: :ok
    # end

    def destroy
        contact = find_contact
        contact.destroy
        render json: {}, head: :no_content
    end


    private

    def contact_params
        params.permit(:name, :organization, :relationship, :phone_number, :address, :email, :notes)
    end

    def find_contact
        @current_user.contacts.find_by(id: params[:id])
    end

end
