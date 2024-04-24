$(document).ready(function() {
    // Function to update user information on the webpage
    function updateUserInformation(user_data) {
        // Update profile picture
        $('.profile-img').attr('src', user_data.profile_image_url);
        // Update name
        $('.name').text(user_data.name);
        // Update institute
        $('.institute').text(user_data.institute_name);
        // Update score
        $('.score').text(user_data.score);
        // Update institute rank
        $('.institute-rank').text(user_data.institute_rank);
        // Update total problems solved
        $('.total-problems').text(user_data.total_problems_solved);
        // Update current streak (assuming user_data.pod_solved_longest_streak and user_data.pod_solved_global_longest_streak are available)
        var currentStreak = user_data.pod_solved_longest_streak;
        var globalStreak = user_data.pod_solved_global_longest_streak;
        var progress = (currentStreak / globalStreak) * 100;
        $('.current-streak').text(currentStreak);
        $('.fill').css('transform', 'rotate(' + (progress * 1.8) + 'deg)');
    }

    // Make an AJAX request to fetch user information from the Flask application
    var username = 'avipritshah'; // Replace with actual username
    $.ajax({
        url: '/user/' + username,
        type: 'GET',
        success: function(response) {
            // Call function to update user information on the webpage
            updateUserInformation(response);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching user information:', error);
        }
    });
});
