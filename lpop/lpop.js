#!/usr/bin/env node

const fs = require('fs');
const n = require('./names.json');
const shuffle = require('./shuffleArray');
const path = require('path');
const cl = require('commander');

// ---- Check for arguments ---- //
cl.version('0.0.1')
  .usage('<keywords>')
  .option('-a, --add <name>')
  .option('-r, --remove <name>')
  .option('-p, --print')
  .option('-s, --setlist')
  .parse(process.argv);

  const lpop = {};

  // save lists to JSON file
  lpop.save = (json, message) => {
    fs.writeFile(path.join(__dirname, 'names.json'), JSON.stringify(json), () => {
      if (message) { console.log(message); }
    });
  }


lpop.resetRandomList = () => {
  n.current = shuffle(n.list);
}

lpop.add = (name, cb) => {
  if (!name && cb) cb(new Error('Invalid name!'));

  n.list.push(name);
  lpop.resetRandomList();

  if (cb) {
    lpop.save(n);
    cb(null, `'${name}' added to the lpop list.`)

  } else {
    lpop.save(n, `'${name}' added to the lpop list.`);

  }
}

lpop.remove = (name, cb) => {
  if (!name && cb) cb(new Error('Invalid name!'));

  const index = n.list.indexOf(name);

  if (index !== -1) {
    n.list.splice(index, 1);
    lpop.resetRandomList();

    if (cb) {
      cb(null, `'${name}' removed from the lpop list.`);
      lpop.save(n);
    }
    else {
      lpop.save(n, `'${name}' removed from the lpop list.`);
    }

  } else {
    if (cb) cb(null, `'${name}' is not on the lpop list.`);
    else console.log(`Sorry, '${name}' is not on the lpop list.`);

  }
}

lpop.getName = (cb) => {
  // when no more random name repopulate the list with a new random set
  if (!n.current.length) {
    lpop.resetRandomList();
  }

  // log a name from the random list
  name = n.current.pop();
  if (cb) {
    cb(null, name);
  } else {
    console.log(name);
  }
  fs.writeFile(path.join(__dirname, 'name.json'), JSON.stringify({'name':name}), () => {

  });
  lpop.save(n);
};


module.exports = lpop;

// ---- Check for arguments ---- //
if (cl.add) {
  lpop.add(cl.add);

} else if (cl.remove) {
  lpop.remove(cl.remove);

} else if (cl.print) {
  console.log(n.list);

} else if (cl.setlist) {
  lpop.resetRandomList();
  lpop.save(n, 'Re-randomised lpop list.');

} else {
  lpop.getName()
}
