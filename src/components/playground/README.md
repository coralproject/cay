# Playground 

As its name implies, the playground is a sandbox to test out UI features on 
a simulated commenting environment.

To see what it looks like, jump into the Invision prototype: https://invis.io/US5G6VXKC

## Component Structure

The basic outline of the component tree is:

    Playground
    - Customizer
      - CustomizerSettings
        - CustomizerToggle (collection)
    - Preview
      - CommentBox
      - Stream
        - Comment
          - ProfileBadge
          - CommentContent
          - StatsBar
          - CommentTools
            - ReportingTools
            - ReactionsTools
    - Sidebar
      - Twitter Stream

## Store

The global state holds the configuration settings needed across all components, as each toggler on the
customizer settings component could hide or reveal parts of any other component. 

