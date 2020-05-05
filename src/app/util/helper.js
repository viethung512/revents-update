import { format, differenceInYears } from 'date-fns';
import arrayToTree from 'array-to-tree';

export const objectToArray = object => {
  let arrayResult = [];
  for (let i in object) {
    arrayResult.push({
      ...object[i],
      id: i,
    });
  }

  return arrayResult;
};

export const createNewEvent = (user, photoURL, event) => ({
  ...event,
  hostUid: user.uid,
  hostedBy: user.displayName,
  hostPhotoURL: photoURL || '/assets/user.png',
  created: Date.now(),
  attendees: {
    [user.uid]: {
      going: true,
      joinDate: Date.now(),
      photoURL: photoURL || '/assets/user.png',
      displayName: user.displayName,
      host: true,
    },
  },
  cancelled: false,
});

export const formatEventDate = date =>
  format(new Date(date * 1000), 'ccc do MMM yyyy hh:mm:ss a');
export const formatDateOfBirth = date =>
  format(new Date(date * 1000), 'ccc do LLL yyyy');
export const parserStringToTimestamp = dateString =>
  Math.round(new Date(dateString).getTime() / 1000);

export const calculateAge = dateOfBirth => {
  if (!dateOfBirth) {
    return null;
  }

  return differenceInYears(Date.now(), dateOfBirth * 1000);
};

export const createDataTree = dataset => {
  const dataTree = arrayToTree(dataset, {
    customID: 'id',
    parentProperty: 'parentId',
  });

  return dataTree;
};
