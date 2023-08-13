python3 -m venv fenv

source fenv/bin/activate

pip install flask

$ pip install -r requirements.txt

export FLASK_ENV=development

$ flask run

The source code is copied from :  
https://github.com/openai/openai-quickstart-python 

1) I changed the numpy==1.21.3 to numpy>=1.21.3

Test question:
"How can I learn Rust Programming language?"

*** NOTES ***
Flask will automatically load the ENV variables from .env file , this is the standard of Flask >1.0.


*** TODO ***

To branch out the repo and do a upgraded version

To update all the packages following the below workflow:

If you want to update the packages in your `requirements.txt` to their latest versions and test them, here's a typical workflow:

1. **Backup Current Environment**:
   Before making any changes, it's a good idea to backup your current environment. This allows you to revert back if something goes wrong.

   ```bash
   pip freeze > requirements_backup.txt
   ```

2. **Update Packages**:
   You can use `pip` to install the latest versions of packages. If you want to update all packages, it's a bit more involved since `pip` doesn't have a built-in command to update all packages at once. However, you can use the following commands:

   ```bash
   pip install --upgrade $(pip freeze | awk -F'[ =]' '{print $1}')
   ```

   This command fetches the list of currently installed packages with `pip freeze`, extracts the package names, and then tells `pip` to upgrade those packages.

3. **Generate the Updated `requirements.txt`**:
   After updating, you can generate a new `requirements.txt` with the updated package versions:

   ```bash
   pip freeze > requirements.txt
   ```

4. **Test Your Application**:
   With the updated packages, thoroughly test your application to ensure that it still works as expected. Look out for any deprecated features, breaking changes, or other issues that might arise from using newer package versions.

5. **Version Control**:
   If you're using version control (like git), commit the changes to your `requirements.txt` after testing. This provides a history of changes and allows you to revert to older versions if necessary.

   ```bash
   git add requirements.txt
   git commit -m "Update package versions"
   git push
   ```

6. **Consider Using Virtual Environments**:
   When working with different projects or testing out new package versions, it's beneficial to use virtual environments. Tools like `venv` or `virtualenv` allow you to create isolated Python environments. This ensures that package updates for one project don't interfere with other projects.

7. **Regularly Review Updates**:
   Periodically review and update your packages to benefit from bug fixes, security patches, and new features. However, always test your application after updates to ensure compatibility.

8. **Consider Automation**:
   Tools like [Dependabot](https://dependabot.com/) or [Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate) can automatically create pull requests to update dependencies in your projects. This can be especially useful for larger projects or when working with a team.

Remember, while it's good to keep packages updated, it's essential to test and ensure that updates don't introduce issues into your application.