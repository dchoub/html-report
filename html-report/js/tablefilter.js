<script>
  $(document).ready(function() {
    $('th.filterable').on('click', function(e) {
      e.stopPropagation(); // Prevent the event from bubbling up
      
      var dropdown = $(this).find('.filter-dropdown');
      dropdown.toggle();
    });
    
    // Hide dropdown menus when clicking outside
    $(document).on('click', function() {
      $('.filter-dropdown').hide();
    });
    
    // Prevent hiding the dropdown menu when clicking inside it
    $(document).on('click', '.filter-dropdown', function(e) {
      e.stopPropagation();
    });
    
    // Apply filtering when selecting an option from the dropdown menu
    $(document).on('change', '.filter-dropdown', function() {
      var columnIndex = $(this).closest('th').index();
      var selectedValue = $(this).val().toLowerCase();
      $('table tbody tr').each(function() {
        var cellValue = $(this).find('td').eq(columnIndex).text().toLowerCase();
        $(this).toggle(selectedValue === '' || cellValue === selectedValue);
      });
    });
    
    // Generate the dropdown menus for each filterable column
    $('th.filterable').each(function() {
      var columnIndex = $(this).index();
      var dropdown = $('<select class="filter-dropdown">');
      dropdown.append('<option value="">All</option>');
      
      var values = [];
      $('table tbody tr').each(function() {
        var cellValue = $(this).find('td').eq(columnIndex).text().trim();
        if (!values.includes(cellValue)) {
          values.push(cellValue);
          dropdown.append('<option value="' + cellValue + '">' + cellValue + '</option>');
        }
      });
      
      $(this).append(dropdown);
    });
  });
</script>
