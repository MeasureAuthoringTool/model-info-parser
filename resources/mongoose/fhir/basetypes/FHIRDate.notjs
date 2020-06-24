const mongoose = require('mongoose/browser');
const cql = require('cql-execution');

function FHIRDate(key, options) {
  mongoose.SchemaType.call(this, key, options, 'Date');
}
FHIRDate.prototype = Object.create(mongoose.SchemaType.prototype);

FHIRDate.prototype.cast = (date) => {
  if (date == null) {
    return date;
  }

  // Already a CQL Date
  if (date.isDate) {
    return date;
  }

  // Object
  if (typeof date === 'object') {
    const keys = Object.keys(date);
    if (keys.includes('year') && keys.includes('month') && keys.includes('day')) {
      return new cql.Date(date.year, date.month, date.day);
    }
  }

  // Date String
  if (!cql.Date.parse(date)) {
    throw new Error(`Date: ${date} is not a valid Date`);
  } else {
    return cql.Date.parse(date);
  }
};

mongoose.Schema.Types.FHIRDate = FHIRDate;
module.exports = FHIRDate;
