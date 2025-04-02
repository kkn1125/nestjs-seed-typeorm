import { Injectable } from '@nestjs/common';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

@Injectable()
export class FirebaseService {
  constructor() {}
}
