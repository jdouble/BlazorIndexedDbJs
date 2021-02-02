using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using BlazorIndexedDbJsClientDemo.Data;
using System.Linq;
using BlazorIndexedDbJs;

namespace BlazorIndexedDbJsClientDemo.Pages
{
    public partial class IndexedDbTest: ComponentBase
    {
        [Inject]
        public TheFactoryDb theFactoryDb {get; set; }

        private string Message { get; set; }
        private IList<Person> People { get; set; } = new List<Person>();
        private Person CurrentPerson { get; set; } = new Person();
        private string FirstNameFilter;
        private string LastNameFilter;

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await GetAll();
                StateHasChanged();
            }
        }

        private async Task GetRecords(int? count = null)
        {
            try
            {
                People = await theFactoryDb.Employees.GetAll<Person>(count);
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }

            StateHasChanged();
        }

        private async Task ClearStore()
        {
            await theFactoryDb.Employees.ClearStore();

            await GetRecords();
        }

        private async Task RecreateDb()
        {
            try
            {
                await theFactoryDb.DeleteDatabase();
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }
            await GetRecords();
        }

        private async Task GetAll(int? count = null)
        {
            try
            {
                People = await theFactoryDb.Employees.GetAll<Person>(count);
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }
        }

        private async Task ConsoleLogTest()
        {
            try
            {
                var list1 = await theFactoryDb.Employees.FirstName.GetAllKeys<int>();
                await theFactoryDb.ConsoleLog("GetAllKeysFromIndex", list1);

                var list2 = await theFactoryDb.Employees.FirstName.GetAllKeys<string, int>("person 10");
                await theFactoryDb.ConsoleLog("GetAllKeysFromIndex", list2);
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }
        }

        private async Task GetByKey(int key, int? count = null)
        {
            try
            {
                People = await theFactoryDb.Employees.GetAll<int, Person>(key, count);
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }
        }

        private async Task GetByKeyArray(int[] key)
        {
            try
            {
                People = await theFactoryDb.Employees.GetAll<int, Person>(key);
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }
        }

        private async Task GetByKeyRange(int lower, int upper, int? count = null)
        {
            var range = new IDBKeyRange<int>() {
                Lower = lower,
                Upper = upper
            };
            try
            {
                People = await theFactoryDb.Employees.GetAll<int, Person>(range, count);
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }
        }

        private async Task GetByFilter()
        {
            try
            {
                var filter = $"if (obj.firstName.toLowerCase().includes('{FirstNameFilter.ToLower()}')) return obj;";
                People = await theFactoryDb.Employees.FirstName.Query<Person>(filter);
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }
        }

        private async Task EditPerson(long id)
        {
            try
            {
                CurrentPerson = await theFactoryDb.Employees.Get<long, Person>(id);
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }
        }

        private async void AddRecord()
        {
            try
            {
                if (CurrentPerson.Id.HasValue)
                {
                    var key = await theFactoryDb.Employees.Put<Person, int>(CurrentPerson);
                    await theFactoryDb.ConsoleLog($"key updated: ", key);
                }
                else
                {
                    var key = await theFactoryDb.Employees.Add<Person, int>(CurrentPerson);
                    await theFactoryDb.ConsoleLog($"key added: ", key);
                }

                CurrentPerson = new Person();
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }

            await GetRecords();
        }

        private async void AddRecords()
        {
            var list = new List<Person>();

            for (int i = 0; i < 100; i++)
            {
                var person = new Person() {
                    FirstName = "person "+i.ToString(),
                    LastName = "lastname "+i.ToString()
                };

                list.Add(person);
            }

            var keys = await theFactoryDb.Employees.BatchAdd<Person, int>(list.ToArray());
            await theFactoryDb.ConsoleLog($"keys added: ", keys);

            await GetRecords();
        }

        private async Task DeleteRecord(long? id)
        {
            try
            {
                await theFactoryDb.Employees.Delete(id);
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }

            await GetRecords();
        }

        private async Task SearchFirstName()
        {
            try
            {
                People = await theFactoryDb.Employees.FirstName.GetAll<string, Person>(FirstNameFilter);
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }
        }

        private async Task SearchFullName()
        {
            try
            {
                People = await theFactoryDb.Employees.FirstName.GetAll<string[], Person>(new string[] { FirstNameFilter, LastNameFilter });
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }
        }
    }
}