$(document).ready(function() {
    // when the page is loaded show the first page and add the search bar
    add_search();
    /* 
        search with an empty query to add the search classes to the elements
        an emtpy string means it matches everything
    */
    search("");
});

// adds the searchbar
function add_search() {
    // the element to hold the search input
    const search_container = $('.page-header.cf');
    // create the search input element
    const searchbar = $('<input type="search"></input>');
    // add a placeholder to give it some context
    searchbar.attr('placeholder', 'Search...');
    // event handler for when the search query changes
    searchbar.keyup(function() {
        // the search query
        var query = $(this).val();
        // call the search function
        search(query);
    });
    // add the searchbar to the page
    search_container.append(searchbar);
}
// runs a search
function search(query) {
    // lets use a simple regex to filter the students, the i flag is case-insensitive
    var re = new RegExp(query, "gi");
    // get the students
    const students = $('.student-list').children();

    var matches = 0;

    students.each(function(i, el) {
        var details = $($(this).children('.student-details').get(0));
        // get the name from the html element
        var name = details.children('h3').html();
        // get the email from the html element
        var email = details.children('.email').html();

        // check if either match the search
        if (re.test(name) || re.test(email)) {
            $(this).addClass('match'); // if it matches add the class
            ++matches;
        } else {
            $(this).removeClass('match'); // if it doesn't match remove it
        }
        console.log(name);
    });

    // remove the no matches text if there is one on the page
    $('#no_matches').remove();

    // if there are not matches then say "no matches"
    if (matches == 0) {
        //the element that will hold the no matches text
        const container = $('.page');
        // create a new element to hold the text
        const text_container = $('<h1>No matches found!</h1>');
        // set the ID so we can reference it later
        text_container.attr('id', 'no_matches');
        // add the text to the page
        container.append(text_container);
    }

    // reset the pagination so it only applies to the matched elements
    paginate(0);
}

// adds or removes and re-adds the pagination buttons
function paginate_buttons(page, totalPages) {
    // sanity check - make sure there isn't already buttons on the page
    $('#pagination_buttons').remove();

    // if there are no pages don't create the page button elements
    if (totalPages == 0)
        return;

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

// paginates the students
function paginate(page) {
    // the list of students
    // the match class is given to elements that matched the search
    const students = $('.student-list').children('.match');

    // hide all the students
    $('.student-list').children().hide();

    // calculate how many pages of students we have
    const studentsPerPage = 10;
    const totalPages = Math.ceil(students.length / studentsPerPage);

    // sanity checks 
    if (page > totalPages - 1)
        page = totalPages - 1;
    if (page < 0)
        page = 0;

    // start and and of the for-loop
    const start = (studentsPerPage * page);
    // picks the smaller of the two, either the length of students or the page end
    var end = (studentsPerPage * (page + 1));
    end = end < students.length ? end : students.length;

    console.log('start: ' + start);
    console.log('end: ' + end);

    // display the relevant students 
    for (let i = start; i < end; i++) {
        var element = students.eq(i);
        element.show(); // show the element
    }

    // (re)create the pagination buttons for ease of programming
    paginate_buttons(page, totalPages);
}