#pragma checksum "e:\projects\MachineworksRazor2\Pages\Maintenance\ManageLookups.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "d6c9af90365681cd24757b00f72afcb2fa49ecde"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MachineworksRazor2.Pages.Maintenance.Pages_Maintenance_ManageLookups), @"mvc.1.0.razor-page", @"/Pages/Maintenance/ManageLookups.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure.RazorPageAttribute(@"/Pages/Maintenance/ManageLookups.cshtml", typeof(MachineworksRazor2.Pages.Maintenance.Pages_Maintenance_ManageLookups), null)]
namespace MachineworksRazor2.Pages.Maintenance
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "e:\projects\MachineworksRazor2\Pages\_ViewImports.cshtml"
using MachineworksRazor2;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d6c9af90365681cd24757b00f72afcb2fa49ecde", @"/Pages/Maintenance/ManageLookups.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ade7ba5a28f85c914a4cb5d26d465d816710f137", @"/Pages/_ViewImports.cshtml")]
    public class Pages_Maintenance_ManageLookups : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("type", new global::Microsoft.AspNetCore.Html.HtmlString("text/javascript"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/ManageLookUps.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(41, 535, true);
            WriteLiteral(@"
<style type=""text/css"">
    .ui-dialog > .ui-widget-header {
        background-color: cornflowerblue;
    }

    .row {
        margin-top: 5px;
    }

    .col-sm-2 {
        width: 250px;
    }

    .buttonBox {
        margin-top: 40px;
    }
</style>

<div class=""container"" style=""width:100%"">
    <div class=""row"">
        <div class=""col-sm-2"">
            <label for=""Category"">Lookup Name</label>
            <select id=""Category"" class=""form-control input-sm"" style=""width: 200px;"">
                ");
            EndContext();
            BeginContext(576, 44, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "b41aebda2a774c08a9d7b29ce12231ca", async() => {
                BeginContext(593, 18, true);
                WriteLiteral("Select Lookup Name");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(620, 5715, true);
            WriteLiteral(@"
            </select>
        </div>
        <div class=""col-sm-1"">
            <label for=""btnAddCategory"">&nbsp;</label>
            <input class=""form-control btn-primary input-lg"" value=""Add Lookup Name"" style=""width: 160px; margin-left: 30px"" id=""btnAddCategory"" />
        </div>
    </div>
    <div class=""row"" id=""rowValues"" style=""display:none"">
        <div class=""col-sm-10"">
            <table>
                <thead>
                    <tr>
                        <th>
                            Value
                        </th>
                        <th>
                            Text
                        </th>
                        <th>
                            Active
                        </th>
                    </tr>
                </thead>
                <tbody id=""rowCurrentValues""></tbody>
            </table>
        </div>
    </div>
    <div class=""row"">
        <div id=""searchResultPager"" style=""display: none;"">
        </div>
    </di");
            WriteLiteral(@"v>
    <div class=""row"" id=""rowAction"" style=""display:none"">
        <div class=""col-sm-1"" style=""width:150px"">
            <input class=""form-control btn-primary input-sm"" value=""Update Values"" id=""btnSave"" style=""width: 160px;"" />
        </div>
        <div class=""col-sm-1"">
            <input class=""form-control btn-primary input-sm"" value=""Add Values"" id=""btnAddValues"" style=""width: 160px; margin-left: 80px"" />
        </div>
    </div>
</div>
<div id=""dialogAddCategory"" title=""Add New Lookup"" style=""display: none"">

</div>

<div id=""dialogAdd"" title=""Add Values"" style=""display: none"">
    <div id=""divCategory"">
        <label for=""txtCategory"">Lookup Name</label>
        <input id=""txtCategory"" class=""form-control input-xs"" />
    </div>

    <div class=""row"">
        <div class=""col-sm-6"">
            <table class=""table table-condensed"">
                <thead>
                    <tr>
                        <th>
                            Value
                        </t");
            WriteLiteral(@"h>
                        <th>
                            Text
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input id=""value1"" class=""form-control input-xs newvalue"" /></td>
                        <td><input id=""text1"" class=""form-control input-xs newtext"" /></td>
                    </tr>
                    <tr>
                        <td><input id=""value2"" class=""form-control input-xs newvalue"" /></td>
                        <td><input id=""text2"" class=""form-control input-xs newtext"" /></td>
                    </tr>
                    <tr>
                        <td><input id=""value3"" class=""form-control input-xs newvalue"" /></td>
                        <td><input id=""text3"" class=""form-control input-xs newtext"" /></td>
                    </tr>
                    <tr>
                        <td><input id=""value4"" class=""form-control input-xs newvalue"" /></td>
   ");
            WriteLiteral(@"                     <td><input id=""text4"" class=""form-control input-xs newtext"" /></td>
                    </tr>
                    <tr>
                        <td><input id=""value5"" class=""form-control input-xs newvalue"" /></td>
                        <td><input id=""text5"" class=""form-control input-xs newtext"" /></td>
                    </tr>
                    <tr>
                        <td><input id=""value6"" class=""form-control input-xs newvalue"" /></td>
                        <td><input id=""text6"" class=""form-control input-xs newtext"" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class=""col-sm-6"">
            <table class=""table table-condensed"">
                <thead>
                    <tr>
                        <th>
                            Value
                        </th>
                        <th>
                            Text
                        </th>
                    </tr>
         ");
            WriteLiteral(@"       </thead>
                <tbody>
                    <tr>
                        <td><input id=""value7"" class=""form-control input-xs newvalue"" /></td>
                        <td><input id=""text7"" class=""form-control input-xs newtext"" /></td>
                    </tr>
                    <tr>
                        <td><input id=""value8"" class=""form-control input-xs newvalue"" /></td>
                        <td><input id=""text8"" class=""form-control input-xs newtext"" /></td>
                    </tr>
                    <tr>
                        <td><input id=""value9"" class=""form-control input-xs newvalue"" /></td>
                        <td><input id=""text9"" class=""form-control input-xs newtext"" /></td>
                    </tr>
                    <tr>
                        <td><input id=""value10"" class=""form-control input-xs newvalue"" /></td>
                        <td><input id=""text10"" class=""form-control input-xs newtext"" /></td>
                    </tr>
                ");
            WriteLiteral(@"    <tr>
                        <td><input id=""value11"" class=""form-control input-xs newvalue"" /></td>
                        <td><input id=""text11"" class=""form-control input-xs newtext"" /></td>
                    </tr>
                    <tr>
                        <td><input id=""value12"" class=""form-control input-xs newvalue"" /></td>
                        <td><input id=""text12"" class=""form-control input-xs newtext"" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div id=""lblMessage"">
    </div>
</div>
");
            EndContext();
            BeginContext(6335, 70, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "dfcce20b4c7a4f1282161cb406ae2266", async() => {
                BeginContext(6394, 2, true);
                WriteLiteral("\r\n");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<ManageLookupsModel> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<ManageLookupsModel> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<ManageLookupsModel>)PageContext?.ViewData;
        public ManageLookupsModel Model => ViewData.Model;
    }
}
#pragma warning restore 1591
