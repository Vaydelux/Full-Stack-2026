# Course Quality Standard

The purpose of this course is not to make a learner recognize terms. The purpose is to help a learner become able to build, inspect, debug, and explain a real system.

## A lesson should answer these questions

1. **Why does this exist?**
2. **What problem does it solve?**
3. **Where does it belong in the system?**
4. **What goes into this boundary?**
5. **What comes out?**
6. **What does a small working example look like?**
7. **What should I see when it works?**
8. **What normally goes wrong?**
9. **How do I investigate the failure instead of guessing?**
10. **How does the idea appear in TaskFlow or the track project?**
11. **What changes in production?**
12. **Can I build a small variation without copying?**

## Code quality rules for teaching

- Prefer a small diff to a giant finished file.
- Do not introduce three new abstractions in the same step unless the lesson is explicitly about their relationship.
- Every important command should have a reason and expected evidence.
- Every external input is treated as untrusted until validated at the appropriate boundary.
- Security and authorization are tested with negative cases, not only happy paths.
- Database concepts are taught before the ORM hides them.
- React state is given one clear owner.
- Server state, URL state, form state, and local UI state are not mixed casually.
- Production topics use evidence: logs, metrics, traces, query plans, CI output, container logs, smoke tests, or runtime health.
- Complexity must solve a real problem. The course does not add patterns only because they sound “enterprise.”

## Mastery check

A learner is ready to continue when they can say:

- I can explain the idea simply.
- I know which layer owns it.
- I predicted the result before running it.
- I built the example myself.
- I can prove it works.
- I reproduced a broken version.
- I diagnosed the failure from evidence.
- I repaired the root cause.
- I can change the requirement.
- I can defend the trade-off.

That standard is more important than raw word count.
