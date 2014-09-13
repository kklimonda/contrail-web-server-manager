/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'knockback'
], function (_, Backbone, Knockback) {
    var prefixId = smConstants.CLUSTER_PREFIX_ID,
        modalId = 'configure-' + prefixId,
        editTemplate = contrail.getTemplate4Id("sm-edit-form-template");

    var ClusterEditView = Backbone.View.extend({
        modalElementId: '#' + modalId,
        renderConfigure: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                //var clusterForm = $('#' + modalId).find('#sm-cluster-edit-form').serializeObject();
                that.model.configure(modalId); // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, configureViewConfig, "configureValidation");

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderAddCluster: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createWizardModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, getAddClusterViewConfig());

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderProvision: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, provisionViewConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderAddServers: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createWizardModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, addServerViewConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderAssignRoles: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createWizardModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, assignRolesViewConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        }
    });

    var configureViewConfig = {
        elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_EDIT_CONFIG]),
        view: "AccordianView",
        viewConfig: [
            {
                elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_DETAILS]),
                title: smLabels.TITLE_DETAILS,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'id', view: "FormInputView", viewConfig: {path: 'id', dataBindValue: 'id', class: "span6"}},
                                {elementId: 'email', view: "FormInputView", viewConfig: {path: 'email', dataBindValue: 'email', class: "span6"}}

                            ]
                        }
                    ]
                }
            },
            {
                elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_OPENSTACK]),
                title: smLabels.TITLE_OPENSTACK,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'openstack_mgmt_ip', view: "FormInputView", viewConfig: {path: 'parameters.openstack_mgmt_ip', dataBindValue: 'parameters().openstack_mgmt_ip', class: "span6"}},
                                {elementId: 'openstack_passwd', view: "FormInputView", viewConfig: {path: 'parameters.openstack_passwd', dataBindValue: 'parameters().openstack_passwd', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'gateway', view: "FormInputView", viewConfig: {path: 'parameters.gateway', dataBindValue: 'parameters().gateway', class: "span6"}},
                                {elementId: 'subnet_mask', view: "FormInputView", viewConfig: {path: 'parameters.subnet_mask', dataBindValue: 'parameters().subnet_mask', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'keystone_username', view: "FormInputView", viewConfig: {path: 'parameters.keystone_username', dataBindValue: 'parameters().keystone_username', class: "span6"}},
                                {elementId: 'keystone_password', view: "FormInputView", viewConfig: {path: 'parameters.keystone_password', dataBindValue: 'parameters().keystone_password', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'keystone_tenant', view: "FormInputView", viewConfig: {path: 'parameters.keystone_tenant', dataBindValue: 'parameters().keystone_tenant', class: "span6"}}
                            ]
                        }
                    ]
                }
            },
            {
                elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_CONTRAIL]),
                title: smLabels.TITLE_CONTRAIL,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'analytics_data_ttl', view: "FormInputView", viewConfig: {path: 'parameters.analytics_data_ttl', dataBindValue: 'parameters().analytics_data_ttl', class: "span6"}},
                                {elementId: 'ext_bgp', view: "FormInputView", viewConfig: {path: 'parameters.ext_bgp', dataBindValue: 'parameters().ext_bgp', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'router_asn', view: "FormInputView", viewConfig: {path: 'parameters.router_asn', dataBindValue: 'parameters().router_asn', class: "span6"}},
                                {elementId: 'multi_tenancy', view: "FormDropdownView", viewConfig: {path: 'parameters.multi_tenancy', dataBindValue: 'parameters().multi_tenancy', class: "span6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smConstants.FLAGS}}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'haproxy', view: "FormDropdownView", viewConfig: {path: 'parameters.haproxy', dataBindValue: 'parameters().haproxy', class: "span6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smConstants.STATES}}},
                                {elementId: 'use_certificates', view: "FormDropdownView", viewConfig: {path: 'parameters.use_certificates', dataBindValue: 'parameters().use_certificates', class: "span6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smConstants.FLAGS}}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'database_dir', view: "FormInputView", viewConfig: {path: 'parameters.database_dir', dataBindValue: 'parameters().database_dir', class: "span6"}},
                                {elementId: 'database_token', view: "FormInputView", viewConfig: {path: 'parameters.database_token', dataBindValue: 'parameters().database_token', class: "span6"}}
                            ]
                        }
                    ]
                }
            },
            {
                elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_SERVERS_CONFIG]),
                title: smLabels.TITLE_SERVERS_CONFIG,
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {elementId: 'domain', view: "FormInputView", viewConfig: {path: 'parameters.domain', dataBindValue: 'parameters().domain', class: "span6"}},
                                {elementId: 'password', view: "FormInputView", viewConfig: {path: 'parameters.password', dataBindValue: 'parameters().password', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {elementId: 'gateway', view: "FormInputView", viewConfig: {path: 'parameters.gateway', dataBindValue: 'parameters().gateway', class: "span6"}},
                                {elementId: 'subnet_mask', view: "FormInputView", viewConfig: {path: 'parameters.subnet_mask', dataBindValue: 'parameters().subnet_mask', class: "span6"}}
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: 'base_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'base_image_id', class: "span6", dataBindValue: 'base_image_id', elementConfig: {placeholder: smLabels.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                                },
                                {
                                    elementId: 'package_image_id',
                                    view: "FormDropdownView",
                                    viewConfig: {path: 'package_image_id', class: "span6", dataBindValue: 'package_image_id', elementConfig: {placeholder: smLabels.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    };

    var provisionViewConfig = {
        elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_PROVISIONING]),
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {
                            elementId: 'base_image_id',
                            view: "FormDropdownView",
                            viewConfig: {path: 'base_image_id', class: "span6", dataBindValue: 'base_image_id', elementConfig: {placeholder: smLabels.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                        },
                        {
                            elementId: 'package_image_id',
                            view: "FormDropdownView",
                            viewConfig: {path: 'package_image_id', class: "span6", dataBindValue: 'package_image_id', elementConfig: {placeholder: smLabels.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectUrl(smConstants.IMAGE_PREFIX_ID, smConstants.IMAGE_PREFIX_ID)}}}
                        }
                    ]
                }
            ]
        }
    };

    var assignRolesViewConfig = {
        elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ASSIGN_ROLES]),
        view: "WizardView",
        viewConfig: {
            steps: [
                {
                    elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ASSIGN_ROLES, smLabels.TITLE_SEARCH_SERVERS]),
                    view: "SectionView",
                    title: smLabels.TITLE_SEARCH_SERVERS,
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {
                                        elementId: 'datacenter',
                                        view: "FormDropdownView",
                                        viewConfig: {path: "tag.datacenter", dataBindValue: "tag().datacenter", class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('datacenter')), dataSource: { type: 'remote', url: '/sm/tags/values/datacenter'}}}
                                    },
                                    {
                                        elementId: 'floor',
                                        view: "FormDropdownView",
                                        viewConfig: {path: 'tag.floor', dataBindValue: 'tag().floor', class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('floor')), dataSource: { type: 'remote', url: '/sm/tags/values/floor'}}}
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        elementId: 'hall',
                                        view: "FormDropdownView",
                                        viewConfig: {path: "tag.hall", dataBindValue: "tag().hall", class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('hall')), dataSource: { type: 'remote', url: '/sm/tags/values/hall'}}}
                                    },
                                    {
                                        elementId: 'rack',
                                        view: "FormDropdownView",
                                        viewConfig: {path: 'tag.rack', dataBindValue: 'tag().rack', class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('rack')), dataSource: { type: 'remote', url: '/sm/tags/values/rack'}}}
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        elementId: 'user_tag',
                                        view: "FormDropdownView",
                                        viewConfig: {path: "tag.user_tag", dataBindValue: "tag().user_tag", class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('user_tag')), dataSource: { type: 'remote', url: '/sm/tags/values/user_tag'}}}
                                    }
                                ]
                            }
                        ]
                    },
                    stepType: 'step'
                },
                {
                    elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ASSIGN_ROLES, smLabels.TITLE_SELECT_SERVERS]),
                    title: smLabels.TITLE_SELECT_SERVERS,
                    view: "SectionView",
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {elementId: 'filtered-servers', view: "FormGridView", viewConfig: {path: 'id', class: "span12"} }
                                ]
                            }
                        ]
                    },
                    stepType: 'step',
                    onLoad: function () {

                        $('#filtered-servers').data('contrailGrid').refreshView();
                    }
                },
                {
                    elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ASSIGN_ROLES, smLabels.TITLE_CONFIRM]),
                    title: smLabels.TITLE_ASSIGN_ROLES,
                    view: "SectionView",
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {elementId: 'confirm-servers', view: "FormGridView", viewConfig: {path: 'id', class: "span12"} }
                                ]
                            }
                        ]
                    },
                    stepType: 'step',
                    onLoad: function () {
                        $('#confirm-servers').data('contrailGrid').refreshView();
                    }
                }
            ]
        }
    };

    var addServerViewConfig = {
        elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_SERVERS]),
        view: "WizardView",
        viewConfig: {
            steps: [
                {
                    elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_SERVERS, smLabels.TITLE_SEARCH_SERVERS]),
                    view: "SectionView",
                    title: smLabels.TITLE_SEARCH_SERVERS,
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {
                                        elementId: 'datacenter',
                                        view: "FormDropdownView",
                                        viewConfig: {path: "tag.datacenter", dataBindValue: "tag().datacenter", class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('datacenter')), dataSource: { type: 'remote', url: '/sm/tags/values/datacenter'}}}
                                    },
                                    {
                                        elementId: 'floor',
                                        view: "FormDropdownView",
                                        viewConfig: {path: 'tag.floor', dataBindValue: 'tag().floor', class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('floor')), dataSource: { type: 'remote', url: '/sm/tags/values/floor'}}}
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        elementId: 'hall',
                                        view: "FormDropdownView",
                                        viewConfig: {path: "tag.hall", dataBindValue: "tag().hall", class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('hall')), dataSource: { type: 'remote', url: '/sm/tags/values/hall'}}}
                                    },
                                    {
                                        elementId: 'rack',
                                        view: "FormDropdownView",
                                        viewConfig: {path: 'tag.rack', dataBindValue: 'tag().rack', class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('rack')), dataSource: { type: 'remote', url: '/sm/tags/values/rack'}}}
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        elementId: 'user_tag',
                                        view: "FormDropdownView",
                                        viewConfig: {path: "tag.user_tag", dataBindValue: "tag().user_tag", class: "span6", elementConfig: {placeholder: (smLabels.TITLE_SELECT + ' ' + smLabels.get('user_tag')), dataSource: { type: 'remote', url: '/sm/tags/values/user_tag'}}}
                                    }
                                ]
                            }
                        ]
                    },
                    stepType: 'step'
                },
                {
                    elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_SERVERS, smLabels.TITLE_SELECT_SERVERS]),
                    title: smLabels.TITLE_SELECT_SERVERS,
                    view: "SectionView",
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {elementId: 'add-server-filtered-servers', view: "FormGridView", viewConfig: {path: 'id', class: "span12"} }
                                ]
                            }
                        ]
                    },
                    stepType: 'step',
                    onLoad: function () {
                        console.log(ko.dataFor(this));
                        $('#add-server-filtered-servers').data('contrailGrid').refreshView();
                    }
                },
                {
                    elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_SERVERS, smLabels.TITLE_ADD_TO_CLUSTER]),
                    title: smLabels.TITLE_ADD_TO_CLUSTER,
                    view: "SectionView",
                    viewConfig: {
                        rows: [
                            {
                                columns: [
                                    {elementId: 'add-server-confirm-servers', view: "FormGridView", viewConfig: {path: 'id', class: "span12"} }
                                ]
                            }
                        ]
                    },
                    stepType: 'step',
                    onLoad: function () {
                        $('#add-server-confirm-servers').data('contrailGrid').refreshView();
                    }
                }
            ]
        }
    };

    function getAddClusterViewConfig() {
        var addClusterViewConfig = {
                elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_CLUSTER]),
                view: "WizardView",
                viewConfig: {
                    steps: []
                }
            },
            steps = [],
            configureStepViewConfig = null,
            addServerStepViewConfig = null,
            assignRolesStepViewConfig = null,
            provisionStepViewConfig;


        //Appending Configure Server Steps
        configureStepViewConfig = $.extend(true, {}, configureViewConfig, {
            title: smLabels.TITLE_CONFIGURE,
            stepType: 'step',
            onNext: function () {
                console.log('Next : Step 1')
                return true;
            }
        });
        steps = steps.concat(configureStepViewConfig);

        //Appending Add Server Steps
        addServerStepViewConfig = $.extend(true, {}, addServerViewConfig.viewConfig).steps;
        addServerStepViewConfig[0].title = 'Add Server';
        addServerStepViewConfig[1].stepType = 'sub-step';
        addServerStepViewConfig[2].stepType = 'sub-step';
        steps = steps.concat(addServerStepViewConfig);

        //Appending Assign Roles Steps
        assignRolesStepViewConfig = $.extend(true, {}, assignRolesViewConfig.viewConfig).steps;
        assignRolesStepViewConfig[0].title = 'Assign Roles';
        assignRolesStepViewConfig[1].stepType = 'sub-step';
        assignRolesStepViewConfig[2].stepType = 'sub-step';
        steps = steps.concat(assignRolesStepViewConfig);

        //Appending Provision steps
        provisionStepViewConfig = $.extend(true, {}, provisionViewConfig, {
            title: smLabels.TITLE_PROVISION,
            stepType: 'step',
            onNext: function () {
                console.log('Next : Step 1')
                return true;
            }
        });
        steps = steps.concat(provisionStepViewConfig);

        addClusterViewConfig.viewConfig.steps = steps;

        return addClusterViewConfig;

    }

    return ClusterEditView;
});