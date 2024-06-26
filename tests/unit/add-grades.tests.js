const assert = require('assert');
const fetch = require('node-fetch');

suite('Add Grades page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8888/Add-Grade");
    let body = await res.text();
    assert.ok(body.includes("<h1>Add New Grade</h1>"));
  });

  test('Grade HTML form', async function() {
    let res = await fetch("http://localhost:8888/Add-Grade");
    let body = await res.text();
    
    let subjectFieldFound = body.includes('<input id="subject" type="text" name="subject"/>');
    assert.ok(subjectFieldFound, "Field 'subject' is missing");

    let valueFieldFound = body.includes('<input id="value" type="text" name="value"/>');
    assert.ok(valueFieldFound, "Field 'value' is missing");

    let buttonAddFound = body.includes('<button type="submit">Add</button>');
    assert.ok(buttonAddFound, "Button [Add] is missing");
  });

  test('Add valid grade', async function() {
    let res = await fetch(
      "http://localhost:8888/Add-Grade",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "subject=Physics&value=3.90"
      }
    );
    let body = await res.text();
    let gradesReturned = body.includes(
		"Cannot GET /grades");
    assert.ok(gradesReturned, "Add grade failed");
  });

  test('Add invalid grade', async function() {
     let res = await fetch(
      "http://localhost:8888/Add-Grade",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "subject=&value=6.00"
      }
    );
    let body = await res.text();
    let errMsg = body.includes("Cannot add grade. Subject and value fields are required!");
    assert.ok(errMsg, "Add invalid grade should display an error message");

    res = await fetch("http://localhost:8888/");
    body = await res.text();
	  assert.ok(body.includes("Grades: <b>3</b>"), 
		"Add invalid grade should not change the grades count");
  });
});
