const user = {
  uuid: 'd2dea790-d56e-499b-84da-1ac850ad9abd',
  name: 'John Doe',
  age: 30,
  country: 'Australia',
  allergies: 'nut, dairy',
  history: 'heart operation in 2019'
}

export const useUser = () => {
  return user;
}

const medication = {
  uuid: '56abb251-b9c3-4ab1-b64e-e20d17173ae5',
  repeatsLeft: 2,
  name: 'Paracetamol',
  sideEffects: 'Queezy, sleepy',
  warnings: 'Increased heart rate',
  instructions: 'Take up to 4 times a day to manage pain'
}

export const useMedication = () => {
  return medication;
}