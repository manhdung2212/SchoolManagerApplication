﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolManager.Models;

namespace SchoolManager.Controllers
{
    public class BuildingController : Controller
    {
        // GET: Building
        SchoolManagementEntities db = new SchoolManagementEntities();
        public ActionResult Index()
        {
            return View();
        }
        
        public PartialViewResult ListBuilding(int pageNumber, int pageSize, string search)
        {
            

            var data = db.Buildings.OrderBy(x=>x.Name);
            if (search.Trim() != "")
            {
                data = data.Where(x => x.Name.Contains(search)).OrderBy(x=>x.Name);
                
            }
            
            var pageCount = data.Count() % pageSize == 0 ? data.Count() / pageSize : data.Count() / pageSize + 1;
            ViewBag.pageCount = pageCount;
            if ( pageCount >= pageNumber)
            {
                var model = data.OrderBy(x => x.Name).Skip(pageSize * pageNumber - pageSize).Take(pageSize).ToList();
                ViewBag.pageNumber = pageNumber;
                return PartialView(model);
            }
            
            ViewBag.pageNumber = 1;
            return PartialView(data.OrderBy( x => x.Name).ToList());


        }
        public PartialViewResult FormCreateEdit()
        {

            return PartialView();
        }
       
        public PartialViewResult InfoDetail(int id)
        {
            Building cl = db.Buildings.Find(id);
            return PartialView(cl);
        }


        [HttpPost]
        public JsonResult Create(string node, string name)
        {
            Building cl = new Building();
            cl.Node = node;
            cl.Name = name;
           
            cl.CreateDate = DateTime.Now;
            
            db.Buildings.Add(cl);
            db.SaveChanges();
            return Json(true);
        }
        [HttpPost]
        public JsonResult Update(int id, string node, string name)
        {
            var cl = db.Buildings.Find(id);
            cl.Node = node;
            cl.Name = name;

            cl.UpdateDate = DateTime.Now;
            db.SaveChanges();
            return Json(true);
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            var cl = db.Buildings.Find(id);
            db.Buildings.Remove(cl); 
            db.SaveChanges();
            return Json(true);
        }
    }
}