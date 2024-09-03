# OptiBus Duty Manager

## Introduction
This repository contains a small application created as part of the Optibus home task. The purpose of this application is to simulate a system where bus drivers can sign up for driving duties, while adhering to certain safety regulations.

The application is built using React and TypeScript and demonstrates key functionality for selecting and managing bus driving duties, with specific constraints to ensure safety.

## Project Links

- GitHub Repository: [https://github.com/dfamr01/OptioBus](https://github.com/dfamr01/OptioBus)
- CodeSandbox: [https://codesandbox.io/p/devbox/7shspn](https://codesandbox.io/p/devbox/7shspn)

## Features

1. Split interface showing available duties and signed-up duties.
2. Display of duty information including name, depot, date, start time, and end time.
3. Ability to sign up for duties by clicking on them.
4. Enforcement of regulations:
   - Prevention of overlapping duties
   - Ensuring 8 hours of rest between duties
5. Ability to unassign from duties.

## Technology Stack

- React.js
- TypeScript
- Jest for testing
- React Testing Library

## Project Structure

```
src/
├── features/
│   └── duty-manager/
│       ├── duty-manager-components/
│       │   └── DutyManagerContainer/
│       │       ├── components/
│       │       │   └── DutyList/
│       │       │       ├── __tests__/
│       │       │       └── index.tsx
│       │       └── index.tsx
│       └── duty-manager-hooks/
│           └── duty-manager.hooks.ts
├── shared/
│   └── __tests__/
│       └── utils.test.tsx
├── models/
│   ├── duties/
│   │   ├── __test__/
│   │   ├── BusDuty.ts
│   │   └── Duty.ts
│   ├── rules/
│   │   ├── __test__/
│   │   ├── DayShiftRule.ts
│   │   ├── DriverShiftRule.ts
│   │   ├── NightShiftRule.ts
│   │   ├── Rule.ts
│   │   └── RuleManager.ts
│   └── types/
│       ├── interfaces.ts
│       └── types.ts
├── utils.ts
├── App.css
├── App.tsx
└── data.json
```

This structure reflects a feature-based organization with shared components and models. Key points:

- The `duty-manager` feature is isolated in its own directory.
- Components are nested within their respective feature directories.
- Models are separated into `duties` and `rules`.
- Shared utilities and types are in their own directories.
- Test files are typically placed in `__tests__` directories next to the files they're testing.

## Setup and Running

1. Clone the repository:
   ```
   git clone https://github.com/dfamr01/OptioBus.git
   ```

2. Install dependencies:
   ```
   cd OptioBus
   npm install
   ```

3. Run the application:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Alternatively, you can view and edit the project directly on CodeSandbox using the link provided above.

## Running Tests

To run the tests:

```
npm test
```

## Additional Notes

## Additional Notes

- The application uses a custom hook `useDuty` for managing the state of available and assigned duties.
- The `RuleManager` class is used to manage and apply different rules for duty assignment.
- The project structure separates concerns into models, components, and hooks for better maintainability.

### Object-Oriented Programming (OOP) and SOLID Principles

The project leverages OOP concepts and adheres to SOLID design principles:

1. **Single Responsibility Principle (SRP)**: Each class has a single, well-defined responsibility. For example, `BusDuty` is responsible for bus-specific duty logic, while `RuleManager` handles rule application.

2. **Open/Closed Principle (OCP)**: The system is designed to be easily extensible. New types of duties (e.g., `TaxiDuty`, `ShuttleDuty`) can be added by extending the base `Duty` class without modifying existing code:

   ```typescript
   export class TaxiDuty extends Duty {
     // Taxi-specific implementations
   }

   export class ShuttleDuty extends Duty {
     // Shuttle-specific implementations
   }
   ```

3. **Liskov Substitution Principle (LSP)**: Derived classes like `BusDuty` can be used interchangeably with the base `Duty` class without affecting the correctness of the program.

4. **Interface Segregation Principle (ISP)**: The use of specific interfaces (like `RuleManager`) ensures that classes only depend on the methods they use.

5. **Dependency Inversion Principle (DIP)**: High-level modules (like `BusDuty`) depend on abstractions (like the `Duty` base class and `RuleManager` interface) rather than concrete implementations.

The `BusDuty` class demonstrates these principles:

```typescript
export class BusDuty extends Duty {
  ruleManager: RuleManager;

  constructor({ id, name, depot, start, end, ruleManager }) {
    super({ id, name, depot, start, end });
    this.ruleManager = ruleManager;
  }

  restPeriod(otherDuty: Duty): number | null {
    if (this.ruleManager) {
      return this.ruleManager.getApplicableRestPeriod(this, otherDuty);
    }
    return null;
  }
}
```

This design allows for:
- Easy addition of new duty types (e.g., `TaxiDuty`, `ShuttleDuty`) by extending `Duty`.
- Flexible rule management through the `RuleManager` interface.
- Clear separation of concerns between duty types and rule application.

The OOP approach and adherence to SOLID principles make the codebase more maintainable, extensible, and robust to changes.

## Future Improvements

- Implement data persistence (local storage or backend integration)
- Add more sophisticated UI for better user experience
- Implement additional regulations as needed
- Add more comprehensive test coverage
