using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using BlazorIndexedDbJsClientDemo.Data;
using System.Linq;
using BlazorIndexedDbJs;

namespace BlazorIndexedDbJsClientDemo.Pages
{
    public partial class IndexedDbTest: ComponentBase, IDisposable
    {
        [Inject]
        public TheFactoryDb theFactoryDb {get; set; }

        private string Message { get; set; }
        private IList<Person> People { get; set; } = new List<Person>();
        private Person CurrentPerson { get; set; } = new Person();
        private string FirstNameFilter;
        private string LastNameFilter;

        protected override void OnInitialized()
        {
            theFactoryDb.ActionCompleted += OnIndexedDbNotification;
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await GetAll();
                StateHasChanged();
            }
        }

        public void Dispose()
        {
            theFactoryDb.ActionCompleted -= OnIndexedDbNotification;
        }

        private async Task GetRecords(int? count = null)
        {
            try
            {
                People = await theFactoryDb.GetAll<Person>(TheFactoryDb.Employees, count);
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }

            StateHasChanged();
        }

        private async Task ClearStore()
        {
            await theFactoryDb.ClearStore(TheFactoryDb.Employees);

            await GetRecords();
        }

        private async Task RecreateDb()
        {
            try
            {
                await theFactoryDb.DeleteDb();
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
                People = await theFactoryDb.GetAll<Person>(TheFactoryDb.Employees, count);
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
                var list1 = await theFactoryDb.GetAllKeysFromIndex<int>(TheFactoryDb.Employees, "firstName");
                await theFactoryDb.ConsoleLog("GetAllKeysFromIndex", list1);

                var list2 = await theFactoryDb.GetAllKeysFromIndex<string, int>(TheFactoryDb.Employees, "firstName", "person 10");
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
                People = await theFactoryDb.GetAll<int, Person>(TheFactoryDb.Employees, key, count);
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
                People = await theFactoryDb.GetAll<int, Person>(TheFactoryDb.Employees, key);
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
                People = await theFactoryDb.GetAll<int, Person>(TheFactoryDb.Employees, range, count);
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
                People = await theFactoryDb.Query<Person>(TheFactoryDb.Employees, filter);
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
                CurrentPerson = await theFactoryDb.Get<long, Person>(TheFactoryDb.Employees, id);
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
                    await theFactoryDb.Put(TheFactoryDb.Employees, CurrentPerson);
                }
                else
                {
                    await theFactoryDb.Add(TheFactoryDb.Employees, CurrentPerson);
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

            await theFactoryDb.BatchAdd<Person>(TheFactoryDb.Employees, list.ToArray());

            await GetRecords();
        }

        private async Task DeleteRecord(long? id)
        {
            try
            {
                await theFactoryDb.Delete(TheFactoryDb.Employees, id);
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
                People = await theFactoryDb.GetAllFromIndex<string, Person>(TheFactoryDb.Employees, "firstName", FirstNameFilter);
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
                People = await theFactoryDb.GetAllFromIndex<string[], Person>(TheFactoryDb.Employees, "fullName", new string[] { FirstNameFilter, LastNameFilter });
            }
            catch (IDBException e)
            {
                Message = e.Message;
            }
        }

        private void OnIndexedDbNotification(object sender, IDBManagerNotificationArgs args)
        {
            Message = args.Message;

            StateHasChanged();
        }
    }
}