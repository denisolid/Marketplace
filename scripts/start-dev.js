import { spawn } from 'child_process';

function startProcess(command, name) {
  const [cmd, ...args] = command.split(' ');
  const process = spawn(cmd, args, { stdio: 'inherit', shell: true });

  process.on('error', (error) => {
    console.error(`[${name}] Failed to start:`, error.message);
  });

  return process;
}

console.log('Starting development servers...\n');

// Start backend
const backend = startProcess('npm run dev:backend', 'Backend');

// Start frontend
const frontend = startProcess('npm run dev:frontend', 'Frontend');

// Handle process termination
process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});