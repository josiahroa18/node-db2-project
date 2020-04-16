exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('cars').insert([
        {
          vin: 41334, 
          make: 'Subaru', 
          model: 'Outback',
          mileage: 88000
        },
        {
          vin: 62342, 
          make: 'Toyota', 
          model: 'Corolla',
          mileage: 160433
        },
        {
          vin: 89921, 
          make: 'Ford', 
          model: 'F150',
          mileage: 32160
        },
      ]);
    });
};
