import chalk from 'chalk';

class Logger {
  info(message) {
    console.log(chalk.cyan(`ℹ️ ${message}`));
  }

  success(message) {
    console.log(chalk.green.bold(`✅ ${message}`));
  }

  warning(message) {
    console.log(chalk.yellow(`⚠️ ${message}`));
  }

  error(message, error) {
    console.error(chalk.red.bold(`❌ ${message}`), error);
  }

  api(endpoint) {
    console.log(chalk.cyan(`   - ${endpoint}`));
  }
}

export const logger = new Logger();