<?php

// Function to execute terminal commands and return output
function executeCommands($commands) {
    // Use `shell_exec()` function to execute terminal commands
    $output = shell_exec($commands);
    
    // Return the output of the commands
    return $output;
}

// Function to execute terminal commands in background
function executeCommandsInBackground($commands) {
    // Execute the commands in the background and return the PID
    $output = shell_exec("($commands) > /dev/null 2>&1 & echo $!");
    
    // Return the PID (Process ID) of the background process
    return trim($output);
}

// Function to send interrupt signal (Ctrl+C) to a process
function sendInterruptSignal($pid) {
    // Send SIGINT (interrupt) signal to the process
    posix_kill($pid, SIGINT);
}

// Commands to be executed
$commands = "source myenv/bin/activate && cd /home/user/Backupfolder/ && python3 RPiLoggerV4.py"; 

// Execute the commands in the background
$pid = executeCommandsInBackground($commands);
echo "<pre>Background process PID: $pid</pre>"; // Display the PID

// Wait for a few seconds before sending the interrupt signal
sleep(10);

// Send interrupt signal to the background process (Python script)
sendInterruptSignal($pid);

echo "<pre>Sent interrupt signal to PID: $pid</pre>";
?>
