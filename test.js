
const cloneObject = (resultClone, firstObj) => {
  for (const firstObjKey in firstObj) {
    if (typeof firstObj[firstObjKey] === "object" && !Array.isArray(firstObj[firstObjKey])) {
      resultClone[firstObjKey] = cloneObject({}, firstObj[firstObjKey])
    } else if (Array.isArray(firstObj[firstObjKey])) {
      resultClone[firstObjKey] = [...firstObj[firstObjKey]]
    } else {
      resultClone[firstObjKey] = firstObj[firstObjKey]
    }
  }
  return resultClone
}

const mergeObjects = (objFirst, objSecond) => {
  for (let objSecondKey in objSecond) {
    if (typeof objSecond[objSecondKey] === "object" && !Array.isArray(objFirst[objSecondKey])) {
      objFirst[objSecondKey] = mergeObjects(objFirst[objSecondKey], objSecond[objSecondKey])
    } else if (
      typeof objSecond[objSecondKey] === "object" &&
      Array.isArray(objFirst[objSecondKey]) &&
      objFirst[objSecondKey][objFirst[objSecondKey].length - 1] !== objSecond[objSecondKey]
    ) {
      objFirst[objSecondKey] = [...objFirst[objSecondKey], objSecond[objSecondKey]]
    } else if (objSecond[objSecondKey] === undefined && Array.isArray(objFirst[objSecondKey])) {
      objFirst[objSecondKey] = []
    } else {
      objFirst[objSecondKey] = objSecond[objSecondKey]
    }
  }
  for (let objFirstKey in objFirst) {
    if (objFirst[objFirstKey] === undefined) {
      delete objFirst[objFirstKey]
    }
  }
  return objFirst
}

var a = {
  first_name: "Bob",
  last_name: "Joness",

  email: "bob@gmail.com",

  address: {
    line_1: "1234 Main St",
    line_2: "Apt 413",
    city: "Los Angeles",
    state: "CA",
    zip: "90048",
  },

  logins: [
    { date: "10/22/2012", ip: "192.168.0.1" },
    { date: "10/21/2012", ip: "192.168.0.1" },
  ],

  photos: ["IMG-1985.jpg", "IMG-1987.jpg"],
}

var b = {
  last_name: "Jones",
  active: true,
  address: {
    line_1: "2143 South Main St",
    line_2: undefined,
  },

  logins: { date: "10/23/2012", ip: "192.168.0.1" },

  photos: undefined,
}

// Result: {
//     first_name: 'Bob',
//         last_name: 'Jones',
//
//         active: true,
//         email: 'bob@gmail.com',
//
//         address: {
//         line_1: '2143 South Main St',
//             city: 'Los Angeles',
//             state: 'CA',
//             zip: '90048'
//     },
//
//     logins: [
//         { date: '10/22/2012', ip: '192.168.0.1' },
//         { date: '10/21/2012', ip: '192.168.0.1' },
//         { date: '10/23/2012', ip: '192.168.0.1' }
//     ],
//
//         photos: []
// }

// function merge(current, updates) {
//   for (let key of Object.keys(updates)) {
//     if (!current.hasOwnProperty(key) || typeof updates[key] !== "object") {
//       current[key] = updates[key]
//     } else merge(current[key], updates[key])
//   }
//   return current
// }

console.log(merge(a, b))
