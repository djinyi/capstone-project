puts "🌱 Seeding spices..."

User.destroy_all
Pet.destroy_all
Contact.destroy_all
Checklist.destroy_all

u1 = User.create(username: "Lunis Loon", password: "password", name: "Lunis Loon", family_members: ["FeatherTip", "Sticks"], address: "100 Birb St. Flagstaff, AZ 86005", dob: 01012020, phone_number: 9281234567, email: "troublebubble@birbmail.com")
u2 = User.create(username: "Miles Razorbeak", password: "password", name: "Miles Razorbeak", family_members: ["Rio"], address: "101 Birb St. Flagstaff, AZ 86005", dob: 01012020, phone_number: 9282345678, email: "resplendentfeather@birbmail.com")
u3 = User.create(username: "Kylo the Seedy", password: "password", name: "Kylo the Seedy", family_members: ["Safflower", "Sunflower"], address: "102 Birb St. Flagstaff, AZ 86005", dob: 01012020, phone_number: 9283456789, email: "seed4life@birbmail.com")

p1 = Pet.create(name: "Tooth", breed: "Green Cheek Conure", description: "Yellow sided pineapple conure.", picture: nil, medical_needs: "N/A", dob: 01012020, notes: "N/A", user_id: u1.id)
p2 = Pet.create(name: "Sharky", breed: "Monk Parakeet", description: "Blue and grayish.", picture: nil, medical_needs: "N/A", dob: 01012020, notes: "N/A", user_id: u3.id)
p3 = Pet.create(name: "Hercules", breed: "Dalmation", description: "Very small. Head rather big for body.", picture: nil, medical_needs: "N/A", dob: 01012020, notes: "N/A", user_id: u2.id)
p4 = Pet.create(name: "Carlos", breed: "Pig", description: "Pink and sturdy looking.", picture: nil, medical_needs: "N/A", dob: 01012020, notes: "N/A", user_id: u1.id)
p5 = Pet.create(name: "Darwin", breed: "African Pygmy Hedgehog", description: "White fur.", picture: nil, medical_needs: "N/A", dob: 01012020, notes: "N/A", user_id: u3.id)

c1 = Contact.create(name: "Zak", organization: "human neighbor", relationship: "last resort petsitter", phone_number: 9284567823, address: "103 Birb St. Flagstaff, AZ 86005", email: "zak@birbmail.com", notes: "bribe with food")
c2 = Contact.create(name: "Dr. Tereza Rumfola", organization: "Canyon Pet Hospital", relationship: "exotic veterinarian", phone_number: 9287745197, address: "1054 E Old Canyon Ct, Flagstaff, AZ 86001", email: "supportservices@canyonpet.com", notes: "open 24 hours")
c3 = Contact.create(name: "Dr. Carly Bennett", organization: "Coconino Humane Association", relationship: "animal shelter", phone_number: 9285260742, address: "11665 N. US Hwy 89 Flagstaff, AZ 86004", email: "support@highcountryhumane.org", notes: "7 days a week 11 am - 5 pm")
c4 = Contact.create(name: "Miranda S.", organization: "N/A", relationship: "breeder", phone_number: 9281524613, address: "N/A", email: "miranda@birbmail.com", notes: "Tooth's breeder")

PetContact.create(pet_id: p1.id, contact_id: c1.id)
PetContact.create(pet_id: p2.id, contact_id: [c2.id, c3.id])
PetContact.create(pet_id: p3.id, contact_id: c1.id)
PetContact.create(pet_id: p4.id, contact_id: c4.id)
PetContact.create(pet_id: p5.id, contact_id: c4.id)



puts "✅ Done seeding!!"
