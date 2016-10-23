export default {
  tags: ['form', 'standalone-form'],
  'User logs in': client => {
    const loginPage = client.page.loginPage();
    const { baseUrl, testUser } = client.globals;

    loginPage
      .navigate(baseUrl + '/login')
      .ready()

    loginPage.login(testUser)
    client.pause(2000);
  },
  'User goes to forms': client => {
    const { baseUrl } = client.globals;
    const createFormPage = client.page.createFormPage();

    createFormPage
      .navigate(baseUrl + '/forms/create')
      .ready()
  },
  'User creates a Form': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .saveForm()

    client.pause(5000)
  },
  'User makes the form go live': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .goLive()
  },
  'User saves form': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .saveForm()
  },
  'User adds Title': client => {
    const createFormPage = client.page.createFormPage();

    const title = 'Test Title';

    createFormPage
      .addTitle(title)

    // Expect
    createFormPage.expect.element('@formTitle').to.be.present;
    createFormPage.expect.element('@formTitle').to.have.value.that.equals(title);
  },
  'User adds Headline': client => {
    const createFormPage = client.page.createFormPage();

    const headline = 'Test Headline';

    createFormPage
      .addHeadline(headline)

    // Expect
    createFormPage.expect.element('@formHeadline').to.be.present;
    createFormPage.expect.element('@formHeadline').to.have.value.that.equals(headline);
  },
  'User adds Description': client => {
    const createFormPage = client.page.createFormPage();

    const description = 'Test Description';

    createFormPage
      .addDescription(description)

    // Expect
    createFormPage.expect.element('@formDescription').to.be.present;
    createFormPage.expect.element('@formDescription').to.have.value.that.equals(description);
  },
  'User adds a Short Answer': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .addShortAnswer({
        title: 'Test Title',
        description: 'Test Description'
      })
  },
  'User adds Min Chars and tests the final form': client => {
    const createFormPage = client.page.createFormPage();
    const standAloneFormPage = client.page.standAloneFormPage();

    createFormPage
      .addMinCharsLimit(5)
      .saveForm()

    client.pause(6000)

    createFormPage
      .publishFormOptions()
      .getUrlStandaloneForm(({ url }) =>{

        createFormPage
          .closeModal()

        standAloneFormPage
            .navigate(url)
            .ready()

        // Allowed values
        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("tango", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("violins", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("she sells seashells by the seashore", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        // Not Allowed values

        client
          .url(url)
          .refresh((e) => {
            console.log(e);

            standAloneFormPage
              .addValueToTextField("doge ", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
              })

              .addValueToTextField("red", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
              })

              .addValueToTextField("blue", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
              });
          })

        client.back();
      })
  },
  'User removes Short Answer': client => {
    const createFormPage = client.page.createFormPage();

    client.pause(3000)

    createFormPage
      .deleteWidget()


  },
  'User adds a Short Answer with Max Chars and tests the published form': client => {
    const createFormPage = client.page.createFormPage();
    const standAloneFormPage = client.page.standAloneFormPage();

    const limit = 5;
    createFormPage
      .addShortAnswer({
        title: 'Another Short Answer',
        description: 'Test Description'
      })
      .addMaxCharsLimit(limit)
      .saveForm()

    client.pause(5000)

    createFormPage
      .publishFormOptions()
      .getUrlStandaloneForm(({ url }) => {

        createFormPage
          .closeModal()

        standAloneFormPage
          .navigate(url)
          .ready()

        // Allowed values
        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("tango", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("red", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("blue", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        // Not Allowed values
        client
          .url(url)
          .refresh((e) => {
            console.log(e);

            standAloneFormPage
              .addValueToTextField("tango ", ({ value }) => {
                standAloneFormPage.assert.equal(value.length, limit);
                standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
              })

              .addValueToTextField("violins", ({ value }) => {
                standAloneFormPage.assert.equal(value.length, limit);
                standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
              })

              .addValueToTextField("she sells seashells by the seashore", ({ value }) => {
                standAloneFormPage.assert.equal(value.length, limit);
                standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
              });
          })
      });

      client.back();

    createFormPage
      .deleteWidget()
  },
  'User adds a Short Answer with Max Chars and Min Chars and tests the published form': client => {

      const createFormPage = client.page.createFormPage();
      const standAloneFormPage = client.page.standAloneFormPage();

      const maxLimit = 10;
      const minLimit = 5;

      createFormPage
        .addShortAnswer({
          title: 'This is a Test Short Answer with Min and Max Chars Limit',
          description: 'Min Chars 5, Max Chars 10'
        })
        .addMinCharsLimit(minLimit)
        .addMaxCharsLimit(maxLimit)

      client.pause(2000)

    createFormPage
        .saveForm()

      client.pause(2000)

      createFormPage
        .publishFormOptions()
        .getUrlStandaloneForm(({ url }) => {

          createFormPage
            .closeModal()

          standAloneFormPage
            .navigate(url)
            .ready()

          // Allowed values
          client
            .url(url)
            .refresh((e) => {
              standAloneFormPage
                .addValueToTextField("Hello!", ({ value }) => {
                  standAloneFormPage.submitStandAloneForm();
                  standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
                });
            })

          client
            .url(url)
            .refresh((e) => {
              standAloneFormPage
                .addValueToTextField("tango", ({ value }) => {
                  standAloneFormPage.submitStandAloneForm();
                  standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
                });
            })

          client
            .url(url)
            .refresh((e) => {
              standAloneFormPage
                .addValueToTextField("I love red", ({ value }) => {
                  standAloneFormPage.submitStandAloneForm();
                  standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
                });
            })

            // Not Allowed values
            client
              .url(url)
              .refresh((e) => {
                console.log(e);

                standAloneFormPage
                  .addValueToTextField("Hello, is it me you're looking for?", ({ value }) => {
                    standAloneFormPage.assert.equal(value.length, maxLimit);
                    //standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
                  })

                  .addValueToTextField("I love red!", ({ value }) => {
                    standAloneFormPage.assert.equal(value.length, maxLimit);
                    standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
                  })
              })
        });

    client.back();

    createFormPage
      .deleteWidget();
    
  },
  'User adds a Long Answer with Min Chars and tests the published form': client => {
    const createFormPage = client.page.createFormPage();
    const standAloneFormPage = client.page.standAloneFormPage();

    const limit = 5;

    createFormPage
      .addLongAnswer({
        title: 'Another Short Answer',
        description: 'Test Description'
      })
      .addMinCharsLimit(limit)
      .saveForm()

    client.pause(5000)

    createFormPage
      .publishFormOptions()
      .getUrlStandaloneForm(({ url }) => {

        createFormPage
          .closeModal()

        standAloneFormPage
          .navigate(url)
          .ready()

        // Allowed values
        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("tango", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("violins", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("she sells seashells by the seashore", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        // Not Allowed values
        client
          .url(url)
          .refresh((e) => {
            console.log(e);

            standAloneFormPage
              .addValueToTextField("doge ", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
              })

              .addValueToTextField("red", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
              })

              .addValueToTextField("blue", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
              });
          })
      });

    client.back();

    createFormPage
      .deleteWidget()
  },
  'User adds a Long Answer with Max Chars and tests the published form': client => {
    const createFormPage = client.page.createFormPage();
    const standAloneFormPage = client.page.standAloneFormPage();

    const limit = 5;
    createFormPage
      .addLongAnswer({
        title: 'Another Short Answer',
        description: 'Test Description'
      })
      .addMaxCharsLimit(limit)
      .saveForm()

    client.pause(5000)

    createFormPage
      .publishFormOptions()
      .getUrlStandaloneForm(({ url }) => {

        createFormPage
          .closeModal()

        standAloneFormPage
          .navigate(url)
          .ready()

        // Allowed values
        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("tango", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("red", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("blue", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        // Not Allowed values
        client
          .url(url)
          .refresh((e) => {
            console.log(e);

            standAloneFormPage
              .addValueToTextField("tango ", ({ value }) => {
                standAloneFormPage.assert.equal(value.length, limit);
                standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
              })

              .addValueToTextField("violins", ({ value }) => {
                standAloneFormPage.assert.equal(value.length, limit);
                standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
              })

              .addValueToTextField("she sells seashells by the seashore", ({ value }) => {
                standAloneFormPage.assert.equal(value.length, limit);
                standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
              });
          })
      });

    client.back();

    createFormPage
      .deleteWidget()
  },
  'User adds a Long Answer with Max Chars and Min Chars and tests the published form': client => {
    const createFormPage = client.page.createFormPage();
    const standAloneFormPage = client.page.standAloneFormPage();

    const maxLimit = 10;
    const minLimit = 5;

    createFormPage
      .addLongAnswer({
        title: 'This is a Test Short Answer with Min and Max Chars Limit',
        description: 'Min Chars 5, Max Chars 10'
      })
      .addMinCharsLimit(minLimit)
      .addMaxCharsLimit(maxLimit)

    client.pause(2000)

  createFormPage
      .saveForm()

    client.pause(4000)

    createFormPage
      .publishFormOptions()
      .getUrlStandaloneForm(({ url }) => {

        createFormPage
          .closeModal()

        standAloneFormPage
          .navigate(url)
          .ready()

        // Allowed values
        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("Hello!", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("tango", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField("I love red", ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })

          // Not Allowed values
          client
            .url(url)
            .refresh((e) => {
              console.log(e);

              standAloneFormPage
                .addValueToTextField("Hello, is it me you're looking for?", ({ value }) => {
                  standAloneFormPage.assert.equal(value.length, maxLimit);
                })

                .addValueToTextField("I love red!", ({ value }) => {
                  standAloneFormPage.assert.equal(value.length, maxLimit);
                  standAloneFormPage.waitForElementNotPresent('@finalScreen', 8000);
                })
            })
      })
  },
  after: client => {
    client.end()
  }
};