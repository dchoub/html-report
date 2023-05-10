<script>
  $(document).ready(function() {
    $('th.filterable').on('click', function() {
      // Remove any existing dropdown menus
      $('.dropdown-menu').remove();
      
      var columnIndex = $(this).index();
      var columnText = $(this).text().trim();
      var placeholder = $(this).find('.dropdown-placeholder');
      
      // Generate the dropdown menu
      var dropdown = $('<select class="filter-dropdown">');
      dropdown.append('<option value="">All</option>');
      
      // Extract unique values from the column cells
      var values = [];
      $('table tbody tr').each(function() {
        var cellValue = $(this).find('td').eq(columnIndex).text().trim();
        if (!values.includes(cellValue)) {
          values.push(cellValue);
          dropdown.append('<option value="' + cellValue + '">' + cellValue + '</option>');
        }
      });
      
      // Append the dropdown menu to the column header
      var dropdownContainer = $('<div class="dropdown-menu">');
      dropdownContainer.append(dropdown);
      $(this).append(dropdownContainer);
      placeholder.text(' ▼');
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
  });
</script>
