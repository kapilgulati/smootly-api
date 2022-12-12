import mongoose, { mongo } from 'mongoose';

const db = {
  connect: () => {
    //set this option to avoid warnings
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_HOST);
    mongoose.connection.on('error', (err) => {
      console.error(err);
      console.log('MongoDB error, are you sure if it is running?');
      process.exit();
    });
  },
  close: () => {
    mongoose.connection.close();
  },
};

export default db;
