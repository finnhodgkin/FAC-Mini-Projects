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

// ---- Check for arguments ---- //
if (cl.add) {
  add(cl.add);

} else if (cl.remove) {
  remove(cl.remove);

} else if (cl.print) {
  console.log(n.list);

} else if (cl.setlist) {
  resetRandomList();
  save(n, 'Re-randomised lpop list.');

} else {
  lpop();

}

// ---- lpop functionality below ---- //
function add (name) {
  n.list.push(name);
  resetRandomList();
  save(n, `'${name}' added to the lpop list.`);
}

function remove (name) {
  const index = n.list.indexOf(name);
  if (index !== -1) {
    n.list.splice(index, 1);
    resetRandomList();
    save(n, `'${name}' removed from the lpop list.`);

  } else {
    console.log(`Sorry, '${name}' is not on the lpop list.`);
  }
}

function resetRandomList () {
  n.current = shuffle(n.list);
}

// save lists to JSON file
function save (json, message) {
  fs.writeFile(path.join(__dirname, 'names.json'), JSON.stringify(json), () => {
    if (message) { console.log(message); }
  });
}

function lpop () {
  // when no more random name repopulate the list with a new random set
  if (!n.current.length) {
    resetRandomList();
  }

  // log a name from the random list
  console.log(n.current.pop());
  save(n);
};
