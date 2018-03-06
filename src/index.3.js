
// collection url
fetch('http://localhost:4000/colors')
  .then(res => res.json())
  .then(colors => console.log(colors));

// element url
fetch('http://localhost:4000/colors/1')
  .then(res => res.json())
  .then(colors => console.log(colors));

fetch('http://localhost:4000/colors', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Hot Pink',
    hexCode: '#FF69B4',
  })
})
  .then(res => res.json())
  .then(color => console.log(color));
