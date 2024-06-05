<?php

// Function to execute terminal commands and return output
function executeCommands($commands) {
    // Use `shell_exec()` function to execute terminal commands
    $output = shell_exec($commands);
    
    // Return the output of the commands
    return $output;
}

// Commands to be executed
$commands = "source myenv/bin/activate && cd /home/user/Backupfolder/ && python3 RPiLoggerV4.py"; 

// Execute the commands
$result = executeCommands($commands);
echo "<pre>$result</pre>"; // Displaying the result
?>
