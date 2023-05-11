$(document).ready(function() {
  var table = $('#example').DataTable({
    // Enable pagination
    paging: true,

    // Add the dropdowns to the header cells
    initComplete: function() {
      this.api().columns('.filterable').every(function() {
        var column = this;
        var columnIndex = column.index();
        var header = $(column.header());

        // Create the dropdown container
        var dropdownContainer = $('<div class="dropdown-container">');
        header.append(dropdownContainer);

        // Create the dropdown button
        var dropdownButton = $('<div class="dropdown-button">▼</div>');
        dropdownContainer.append(dropdownButton);

        // Create the dropdown
        var dropdown = $('<select class="filter-dropdown">');
        dropdown.append('<option value="">All</option>');

        // Populate the dropdown with unique values from the column
        column.data().unique().sort().each(function(value) {
          if (value !== '') {
            dropdown.append('<option value="' + value + '">' + value + '</option>');
          }
        });
        dropdownContainer.append(dropdown);

        // Apply filtering when selecting an option from the dropdown menu
        dropdown.on('change', function() {
          var selectedValue = $(this).val().toLowerCase();
          column.search(selectedValue).draw();
        });

        // Hide dropdown menus when clicking outside
        $(document).on('click', function() {
          dropdownContainer.removeClass('active');
        });

        // Show/hide dropdown menus when clicking on the dropdown button
        dropdownButton.on('click', function(e) {
          e.stopPropagation(); // Prevent the event from bubbling up
          dropdownContainer.toggleClass('active');
        });

        // Prevent hiding the dropdown menu when clicking inside it
        dropdownContainer.on('click', function(e) {
          e.stopPropagation();
        });
      });
    },

    // Callback function to keep the filter dropdowns visible after pagination
    drawCallback: function() {
      $('.dropdown-container.active').each(function() {
        var columnIndex = $(this).closest('th').index();
        var selectedValue = $(this).find('.filter-dropdown').val();
        var column = table.column(columnIndex);

        // Apply the filter to the new table data
        column.search(selectedValue).draw();
      });
    }
  });
});
