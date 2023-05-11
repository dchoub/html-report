(document).ready(function() {
      var table = $('#myTable').DataTable({
        drawCallback: function() {
          // Reattach the change event handler to the filter dropdowns
          $('.filter-dropdown').off('change').on('change', function() {
            var columnIndex = $(this).closest('th').index();
            var selectedValue = $(this).val().toLowerCase();

            table.column(columnIndex).search(selectedValue).draw();
          });
        }
      });

      // Add the filter dropdowns to the header cells
      $('.filterable').each(function() {
        var columnIndex = $(this).index();
        var dropdownContainer = $('<div class="dropdown-container">');
        var dropdownButton = $('<div class="dropdown-button">▼</div>');
        var dropdown = $('<select class="filter-dropdown">');
        dropdown.append('<option value="">All</option>');

        // Populate the dropdown with unique values from the column
        table.column(columnIndex).data().unique().sort().each(function(value) {
          dropdown.append('<option value="' + value + '">' + value + '</option>');
        });

        dropdownContainer.append(dropdownButton);
        dropdownContainer.append(dropdown);
        $(this).append(dropdownContainer);
