$(document).ready(function() {
    // when the page is loaded show the first page
    paginate(0);
});

// adds or removes and re-adds the pagination buttons
function paginate_buttons(page, totalPages) {
    // sanity check - make sure there isn't already buttons on the page
    $('#pagination_buttons').remove();

    //the element that will hold the button element
    const container = $('.page');
    // create a new ul element to hold the buttons
    const button_container = $('<ul></ul>');
    // set the ID so we can reference it later
    button_container.attr('id', 'pagination_buttons');
    button_container.addClass('pagination');

    // add the buttons
    for (let i = 0; i < totalPages; ++i) {
        // li element for the button
        var button = $('<li></li>');
        // link in the button
        var button_link = $('<a></a>');
        // set the button text to the page number - add 1 so it starts at 1 and not 0
        button_link.html(i + 1);
        // add a class to the button for the current page so we can highlight it
        if (page == i)
            button_link.addClass('selected');
        // when the button is clicked change the page
        button_link.click(() => paginate(i));
        // add the butotn link to the button
        button.append(button_link);
        // add the button to the buttons list
        button_container.append(button);
    }
    // add the buttons to the page
    container.append(button_container);
}

function paginate(page) {
    // the list of students
    const students = $('.student-list').children();

    // calculate how many pages of students we have
    const studentsPerPage = 10;
    const totalPages = Math.ceil(students.length / studentsPerPage);

    // sanity checks 
    if (page > totalPages - 1)
        page = totalPages - 1;
    if (page < 0)
        page = 0;

    // hide all the students
    students.hide();

    // start and and of the for-loop
    const start = (studentsPerPage * page);
    // picks the smaller of the two, either the length of students or the page end
    var end = (studentsPerPage * (page + 1));
    end = end < students.length ? end : students.length;

    console.log('start: ' + start);
    console.log('end: ' + end);

    // display the relevant students 
    for (let i = start; i < end; i++) {
        //console.log(i);
        var element = students.eq(i);
        element.show(); // show the element
    }

    // (re)create the pagination buttons for ease of programming
    paginate_buttons(page, totalPages);
}