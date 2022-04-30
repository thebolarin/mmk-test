import faker from 'faker';

export const events = () => {
    const events = [
        {
          "id": faker.datatype.uuid(),
          "title": faker.helpers.randomize(),
        },
        {
          "id": faker.datatype.uuid(),
          "title": faker.helpers.randomize(),
        }
      ];

      return events;
};