# UI Library

> :warning: **Please Read!!!** DO NOT ADD SYNDIO RELATED BUSINESS LOGIC IN UI FOLDER.

This folder should only contain generic UI components that:

- Are NOT connected components (No HOC)
- Do not dispatch anything inside UI.
- Do not get business logic directly via fetch
- These components should get business logic data via props
- Do not implement Intl here (Pass it as props)

If you are unsure whether some component belongs here, ask yourself; could this component be used by another company? If so, add it here and make sure that:

- The component is flexible enough for multiple usages
- Write it with scaling in mind
- Use TailwindCSS
- Custom classes should use BEM naming methodology

### Some rules:

- Component's props should NOT have any business props or state.
- All components should be accessible
